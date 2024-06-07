package com.pear.api.user.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 354052228L;

    public static final QUser user = new QUser("user");

    public final com.pear.api.common.model.QBaseEntity _super = new com.pear.api.common.model.QBaseEntity(this);

    public final NumberPath<Long> balance = createNumber("balance", Long.class);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath job = createString("job");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modDate = _super.modDate;

    public final StringPath name = createString("name");

    public final ListPath<com.pear.api.order.model.Order, com.pear.api.order.model.QOrder> orders = this.<com.pear.api.order.model.Order, com.pear.api.order.model.QOrder>createList("orders", com.pear.api.order.model.Order.class, com.pear.api.order.model.QOrder.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath phone = createString("phone");

    public final ListPath<com.pear.api.post.model.Post, com.pear.api.post.model.QPost> posts = this.<com.pear.api.post.model.Post, com.pear.api.post.model.QPost>createList("posts", com.pear.api.post.model.Post.class, com.pear.api.post.model.QPost.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public final StringPath token = createString("token");

    public final StringPath username = createString("username");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

